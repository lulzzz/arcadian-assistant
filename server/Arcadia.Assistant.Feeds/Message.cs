﻿namespace Arcadia.Assistant.Feeds
{
    using System;

    public class Message
    {
        public Guid MessageId { get; }

        public string Title { get; }

        public string Text { get; }

        //TODO: use DateTimeOffset instead
        public DateTimeOffset DatePosted { get; }

        public Message(Guid messageId, string title, string text, DateTimeOffset datePosted)
        {
            this.Title = title;
            this.Text = text;
            this.DatePosted = datePosted;
            this.MessageId = messageId;
        }
    }
}