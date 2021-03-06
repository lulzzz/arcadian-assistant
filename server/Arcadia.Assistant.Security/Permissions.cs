﻿namespace Arcadia.Assistant.Security
{
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    using Arcadia.Assistant.Organization.Abstractions;

    [DataContract]
    public class Permissions
    {
        [DataMember]
        // explicit department permissions by id
        private IReadOnlyDictionary<string, EmployeePermissionsEntry> DepartmentPermissions { get; set; }

        [DataMember]
        // explicit employees by id permissiosn
        private IReadOnlyDictionary<string, EmployeePermissionsEntry> EmployeePermissions { get; set; }

        [DataMember]
        private EmployeePermissionsEntry defaultPermission;

        public Permissions(EmployeePermissionsEntry defaultPermission, 
            IReadOnlyDictionary<string, EmployeePermissionsEntry> departmentPermissions,
            IReadOnlyDictionary<string, EmployeePermissionsEntry> employeePermissions)
        {
            this.defaultPermission = defaultPermission;
            this.DepartmentPermissions = departmentPermissions;
            this.EmployeePermissions = employeePermissions;
        }


        public EmployeePermissionsEntry GetDepartmentPermissions(string departmentId)
        {
            return this.DepartmentPermissions.TryGetValue(departmentId, out var permissions)
                ? permissions
                : this.defaultPermission;
        }

        public EmployeePermissionsEntry GetPermissions(EmployeeContainer employee)
        {
            if (employee == null)
            {
                return EmployeePermissionsEntry.None;
            }

            var permissions = this.defaultPermission;
            if (this.EmployeePermissions.TryGetValue(employee.Metadata.EmployeeId, out var employeePermissions))
            {
                permissions |= employeePermissions;
            }

            return permissions | this.GetDepartmentPermissions(employee.Metadata.DepartmentId);
        }
    }
}