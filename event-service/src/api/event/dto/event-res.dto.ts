import { ApiProperty } from '@nestjs/swagger';
export class CreateEventResDto {
  @ApiProperty({
    default: 201,
  })
  status: number;

  @ApiProperty({
    default: 'Event Created',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  errors: string[];

  @ApiProperty({
    default: {
      name: 'Test',
      location: 'Dhaka',
      has_tickets: true,
      total_no_of_seats: 12,
      description: 'Test test',
      start_at: '2022-05-02T11:43:21.000Z',
      end_at: '2022-05-02T11:43:21.000Z',
      host_id: '626e634969121e7ed974c16e',
      createdAt: '2022-05-02T12:50:12.237Z',
      updatedAt: '2022-05-02T12:50:12.237Z',
      id: 3,
      no_of_seats_booked: 0,
    },
  })
  data: any;
}

export class ShowEventResDto {
  @ApiProperty({
    default: 200,
  })
  status: number;

  @ApiProperty({
    default: 'Event Found',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  errors: string[];

  @ApiProperty({
    default: {
      name: 'Test',
      location: 'Dhaka',
      has_tickets: true,
      total_no_of_seats: 12,
      description: 'Test test',
      start_at: '2022-05-02T11:43:21.000Z',
      end_at: '2022-05-02T11:43:21.000Z',
      host_id: '626e634969121e7ed974c16e',
      createdAt: '2022-05-02T12:50:12.237Z',
      updatedAt: '2022-05-02T12:50:12.237Z',
      id: 3,
      no_of_seats_booked: 0,
    },
  })
  data: any;
}

export class ListEventResDto {
  @ApiProperty({
    default: 200,
  })
  status: number;

  @ApiProperty({
    default: 'Events Found',
  })
  message: string;

  @ApiProperty({
    default: [],
  })
  errors: string[];

  @ApiProperty({
    default: {
      events: [
        {
          name: 'Test',
          location: 'Dhaka',
          has_tickets: true,
          total_no_of_seats: 12,
          description: 'Test test',
          start_at: '2022-05-02T11:43:21.000Z',
          end_at: '2022-05-02T11:43:21.000Z',
          host_id: '626e634969121e7ed974c16e',
          createdAt: '2022-05-02T12:50:12.237Z',
          updatedAt: '2022-05-02T12:50:12.237Z',
          id: 3,
          no_of_seats_booked: 0,
        },
      ],
      meta: {
        totalItems: 3,
        itemCount: 3,
        itemsPerPage: 20,
        totalPages: 1,
        currentPage: 1,
      },
    },
  })
  data: any;
}


export class UpdateEventResDto {
        @ApiProperty({
          default: 201,
        })
        status: number;
      
        @ApiProperty({
          default: 'Event Updated',
        })
        message: string;
      
        @ApiProperty({
          default: [],
        })
        errors: string[];
      
        @ApiProperty({
          default: {
            name: 'Test',
            location: 'Dhaka',
            has_tickets: true,
            total_no_of_seats: 12,
            description: 'Test test',
            start_at: '2022-05-02T11:43:21.000Z',
            end_at: '2022-05-02T11:43:21.000Z',
            host_id: '626e634969121e7ed974c16e',
            createdAt: '2022-05-02T12:50:12.237Z',
            updatedAt: '2022-05-02T12:50:12.237Z',
            id: 3,
            no_of_seats_booked: 0,
          },
        })
        data: any;
      }