﻿namespace Arcadia.Assistant.Calendar.Abstractions.Messages
{
    using System;

    public class UpsertCalendarEvent
    {
        public CalendarEvent Event { get; }

        public UpsertCalendarEvent(CalendarEvent @event)
        {
            this.Event = @event;
        }

        public abstract class Response
        {
        }

        public class Success : Response
        {
            public CalendarEvent Event { get; }

            public Success(CalendarEvent @event)
            {
                this.Event = @event;
            }
        }

        public class Error : Response
        {
            public string Message { get; }

            public Error(string message)
            {
                this.Message = message;
            }
        }
    }
}