import {Committee, Member} from "./member";

export interface FishingEvent {
    id: string;             // The ObjectId (you can replace it with 'string' if you're using MongoDB ObjectId string)
    eventName: string;      // Name of the event (from JSON "eventName")
    location: string;       // Location of the event
    telephone: string;      // Contact phone number
    club: string;           // Club reference (ObjectId of the Club)
    description: string;    // Description of the event
    date: string;           // The event date (ISO string format, e.g., "2025-05-20T09:00:00Z")
    isPrivate: boolean;     // Boolean to check if the event is private or public
    image: string;          // Image URL for the event
    attendees: string[];    // Array of user ObjectIds attending the event
}
