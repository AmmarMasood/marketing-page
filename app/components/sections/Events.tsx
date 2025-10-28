import { Container } from '@/app/components/ui';
import { ContentCard } from '@/app/components/cards';
import type { CalendarEvent } from '@/types';

interface EventsProps {
  events: CalendarEvent[];
}

export function Events({ events }: EventsProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <Container>
  
        <div className="mb-12 text-center">
             <p className="section-label">
            Our Events
          </p>
          <h2 className="section-heading">
            Recommended Events
          </h2>
          <p className="section-description">
           There are many variations of passages of Lorem Ipsum available
            but the majority have suffered alteration in some form.
          </p>
        </div>

    
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {events.map((event, index) => (
            <ContentCard key={event.title + index} content={event} type="event" />
          ))}
        </div>
      </Container>
    </section>
  );
}
