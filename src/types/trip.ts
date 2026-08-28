import { Tables } from '@/utils/supabase/database.type';

export type Trip = Tables<'trip_records'>;
export type TripDestination = Tables<'trip_record_destinations'>;

export type TripFormData = {
  title: string;
  destinationIds: string[];
  startDate: string;
  endDate: string;
  content: string;
  rating: number;
};

export type TripWithDestinations = {
  id: string;
  title: string;
  content: string | null;
  start_date: string | null;
  end_date: string | null;
  rating: number | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  trip_record_destinations: {
    destination_id: string;
    destinations: { name: string; province: string | null } | null;
  }[];
};
