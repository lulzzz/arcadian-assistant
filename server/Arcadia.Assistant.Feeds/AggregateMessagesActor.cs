﻿namespace Arcadia.Assistant.Feeds
{
    using System;
    using System.Collections.Generic;

    using Akka.Actor;
    using Akka.Event;

    using Arcadia.Assistant.Feeds.Messages;

    public class AggregateMessagesActor : UntypedActor, ILogReceive
    {
        private readonly GetMessages request;

        private readonly IActorRef requestor;

        private readonly HashSet<IActorRef> actorsToRespond;

        private readonly ILoggingAdapter logger = Context.GetLogger();

        private readonly List<Message> messages = new List<Message>();

        private static readonly TimeSpan Timeout = TimeSpan.FromSeconds(10);

        public static Props GetProps(IEnumerable<IActorRef> actors, GetMessages request, IActorRef requestor) => 
            Props.Create(() => new AggregateMessagesActor(actors, request, requestor));

        public AggregateMessagesActor(IEnumerable<IActorRef> actors, GetMessages request, IActorRef requestor)
        {
            this.request = request;
            this.requestor = requestor;
            this.actorsToRespond = new HashSet<IActorRef>(actors);
            this.Self.Tell(new StartSearch());

            Context.SetReceiveTimeout(Timeout);
        }

        protected override void OnReceive(object message)
        {
            switch (message)
            {
                case StartSearch _:
                    this.OnStartSearch();
                    break;

                case FinishSearch _:
                    this.OnFinishSearch();
                    break;

                case GetMessages.Response response:
                    this.OnFeedResponseRecieved(response.Messages);
                    break;

                case ReceiveTimeout _:
                    this.logger.Warning("Shutting down message aggregator due to timeout. Actors still to reply: ", string.Join(", ", this.actorsToRespond));
                    this.OnFinishSearch();
                    break;

                default:
                    this.Unhandled(message);
                    break;
            }
        }

        private void OnFeedResponseRecieved(IEnumerable<Message> responseMessages)
        {
            this.actorsToRespond.Remove(this.Sender);
            this.messages.AddRange(responseMessages);
        }

        private void OnFinishSearch()
        {
            this.requestor.Tell(new GetMessages.Response(this.messages));
            Context.Stop(this.Self);
        }

        private void OnStartSearch()
        {
            if (this.actorsToRespond.Count == 0)
            {
                this.Self.Tell(new FinishSearch());
            }

            foreach (var actorRef in this.actorsToRespond)
            {
                actorRef.Tell(this.request);
            }
        }

        private class StartSearch
        {
        }

        private class FinishSearch
        {
        }
    }
}