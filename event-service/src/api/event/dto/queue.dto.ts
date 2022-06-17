export interface ReservationConfirmationEventDto {
    email: string
    name: string;
    event: {
        id: string;
        name: string
    }
    reservation_ref_id: string;
    ticket_link: string,
    phone: string,
}