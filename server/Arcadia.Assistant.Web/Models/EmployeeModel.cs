﻿namespace Arcadia.Assistant.Web.Models
{
    using System;

    using Arcadia.Assistant.Organization.Abstractions;

    public class EmployeeModel
    {
        public string EmployeeId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public Sex Sex { get; set; }

        public Photo Photo { get; set; }

        public string Position { get; set; }

        public string DepartmentId { get; set; }

        public string MobilePhone { get; set; }

        public DateTime? BirthDate { get; set; }

        public DateTime? HireDate { get; set; }

        public static EmployeeModel FromMetadata(EmployeeMetadata metadata)
        {
            return new EmployeeModel()
                {
                    EmployeeId = metadata.EmployeeId,
                    BirthDate = metadata.BirthDate,
                    DepartmentId = metadata.DepartmentId,
                    Email = metadata.Email,
                    HireDate = metadata.HireDate,
                    MobilePhone = metadata.MobilePhone,
                    Name = metadata.Name,
                    Position = metadata.Position,
                    Sex = metadata.Sex
                };
        }
    }
}