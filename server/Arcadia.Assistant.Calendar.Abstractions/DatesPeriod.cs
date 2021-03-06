﻿namespace Arcadia.Assistant.Calendar.Abstractions
{
    using System;

    public sealed class DatesPeriod
    {
        public DateTime StartDate { get; }

        public DateTime EndDate { get; }

        /// <summary>
        /// Starting working hour index. Typically, 0 or 4.
        /// </summary>
        public int StartWorkingHour { get; }

        /// <summary>
        /// Finish working hour index. Typically, 4 or 8
        /// </summary>
        public int FinishWorkingHour { get; }

        public DatesPeriod(DateTime startDate, DateTime endDate, int startWorkingHour = 0, int finishWorkingHour = 8)
        {
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.StartWorkingHour = startWorkingHour;
            this.FinishWorkingHour = finishWorkingHour;
        }

        private bool Equals(DatesPeriod other)
        {
            return this.StartDate.Equals(other.StartDate)
                && this.EndDate.Equals(other.EndDate)
                && (this.StartWorkingHour == other.StartWorkingHour)
                && (this.FinishWorkingHour == other.FinishWorkingHour);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((DatesPeriod)obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hashCode = this.StartDate.GetHashCode();
                hashCode = (hashCode * 397) ^ this.EndDate.GetHashCode();
                hashCode = (hashCode * 397) ^ this.StartWorkingHour;
                hashCode = (hashCode * 397) ^ this.FinishWorkingHour;
                return hashCode;
            }
        }

        public static bool operator ==(DatesPeriod left, DatesPeriod right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(DatesPeriod left, DatesPeriod right)
        {
            return !Equals(left, right);
        }
    }
}