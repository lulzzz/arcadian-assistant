﻿namespace Arcadia.Assistant.Organization
{
    using System;
    using System.Collections.Generic;
    using System.Collections.Immutable;
    using System.Linq;

    using Akka.Actor;
    using Akka.Event;
    using Akka.Util.Internal;

    using Arcadia.Assistant.Organization.Abstractions;
    using Arcadia.Assistant.Organization.Abstractions.OrganizationRequests;

    public class DepartmentActor : UntypedActor, ILogReceive, IWithUnboundedStash
    {
        private DepartmentInfo departmentInfo;

        private readonly IActorRef organizationEmployeesActor;

        private readonly ILoggingAdapter logger = Context.GetLogger();

        private readonly List<EmployeeContainer> employees = new List<EmployeeContainer>();

        private EmployeeContainer head;

//        private EmployeeContainer headEmployee;

        public IStash Stash { get; set; }

        public DepartmentActor(DepartmentInfo departmentInfo, IActorRef organizationEmployeesActor)
        {
            this.departmentInfo = departmentInfo;
            this.organizationEmployeesActor = organizationEmployeesActor;
        }

        protected override void OnReceive(object message)
        {
            switch (message)
            {
                case RefreshDepartmentInfo newInfo when newInfo.Department.DepartmentId == this.departmentInfo.DepartmentId:
                    this.StartRefreshing(newInfo.Department);

                    break;

                case GetDepartmentInfo _:
                    this.Sender.Tell(new GetDepartmentInfo.Result(this.departmentInfo, this.Self));
                    break;

                default:
                    this.Unhandled(message);
                    break;
            }
        }

        private void StartRefreshing(DepartmentInfo newDepartmentInfo)
        {
            this.departmentInfo = newDepartmentInfo;

            if (this.departmentInfo.ChiefId != newDepartmentInfo.ChiefId)
            {
                //TODO record head change
                //this.headEmployee = null;
                //this.employees.Tell(new EmployeesActor.FindEmployee(newInfo.Department.ChiefId));
            }

            this.RefreshHead();
        }

        private void RefreshHead()
        {
            void RefreshingHead(object message)
            {
                switch (message)
                {
                    case EmployeesQuery.Response queryResult:
                        this.head = queryResult.Employees.FirstOrDefault();
                        this.RefreshEmployees();
                        break;

                    default:
                        this.Stash.Stash();
                        break;
                }
            }

            this.organizationEmployeesActor.Tell(EmployeesQuery.Create().WithId(this.departmentInfo.ChiefId));
            this.Become(RefreshingHead);
        }

        private void RefreshEmployees()
        {
            void RefreshingEmployees(object message)
            {
                switch (message)
                {
                    case EmployeesQuery.Response queryResult:
                        this.employees.Clear();
                        this.employees.AddRange(queryResult.Employees);

                        this.Stash.UnstashAll();
                        this.Become(this.OnReceive);
                        break;

                    default:
                        this.Stash.Stash();
                        break;
                }
            }

            this.organizationEmployeesActor.Tell(EmployeesQuery.Create().ForDepartment(this.departmentInfo.DepartmentId));
            this.Become(RefreshingEmployees);
        }

        private UntypedReceive RefreshFinished(IEnumerable<IActorRef> refreshRequesters)
        {
            refreshRequesters.ForEach(x => x.Tell(RefreshDepartmentInfo.Finished.Instance));

            this.Stash.UnstashAll();
            return this.OnReceive;
        }

        public static Props GetProps(DepartmentInfo department, IActorRef organizationEmployeesActor) =>
            Props.Create(() => new DepartmentActor(department, organizationEmployeesActor));

        public sealed class RefreshDepartmentInfo
        {
            public DepartmentInfo Department { get; }

            public RefreshDepartmentInfo(DepartmentInfo department)
            {
                this.Department = department;
            }

            public sealed class Finished
            {
                public static readonly Finished Instance = new Finished();
            }
        }

        public sealed class GetDepartmentInfo
        {
            public static readonly GetDepartmentInfo Instance = new GetDepartmentInfo();

            public sealed class Result
            {
                public DepartmentInfo Department { get; }

                public IActorRef DepartmentActor { get; }

                public Result(DepartmentInfo department, IActorRef departmentActor)
                {
                    this.Department = department;
                    this.DepartmentActor = departmentActor;
                }
            }
        }
    }
}