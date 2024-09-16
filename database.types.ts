export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          id: number;
          imageURL: string | null;
          name: string;
        };
        Insert: {
          id?: number;
          imageURL?: string | null;
          name: string;
        };
        Update: {
          id?: number;
          imageURL?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      certificate_awarded: {
        Row: {
          cert_id: number;
          cert_url: string;
          date_given: string;
          id: number;
          student_username: string;
        };
        Insert: {
          cert_id: number;
          cert_url: string;
          date_given: string;
          id?: number;
          student_username: string;
        };
        Update: {
          cert_id?: number;
          cert_url?: string;
          date_given?: string;
          id?: number;
          student_username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certificate_awarded_cert_id_fkey";
            columns: ["cert_id"];
            isOneToOne: false;
            referencedRelation: "certificates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "certificate_awarded_student_username_fkey";
            columns: ["student_username"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["username"];
          },
        ];
      };
      certificates: {
        Row: {
          date_created: string;
          icon: string;
          id: number;
          name: string;
        };
        Insert: {
          date_created: string;
          icon: string;
          id?: number;
          name: string;
        };
        Update: {
          date_created?: string;
          icon?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          date: string;
          id: number;
          name: string;
          time: string | null;
        };
        Insert: {
          date: string;
          id?: number;
          name: string;
          time?: string | null;
        };
        Update: {
          date?: string;
          id?: number;
          name?: string;
          time?: string | null;
        };
        Relationships: [];
      };
      events_assigned: {
        Row: {
          event_id: number;
          id: number;
          joined: boolean | null;
          student_username: string | null;
          timestamp: string;
        };
        Insert: {
          event_id: number;
          id?: number;
          joined?: boolean | null;
          student_username?: string | null;
          timestamp?: string;
        };
        Update: {
          event_id?: number;
          id?: number;
          joined?: boolean | null;
          student_username?: string | null;
          timestamp?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_assigned_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_assigned_student_username_fkey";
            columns: ["student_username"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["username"];
          },
        ];
      };
      links: {
        Row: {
          id: string;
          platform: string | null;
          student_username: string;
          url: string | null;
        };
        Insert: {
          id?: string;
          platform?: string | null;
          student_username: string;
          url?: string | null;
        };
        Update: {
          id?: string;
          platform?: string | null;
          student_username?: string;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "links_student_username_fkey";
            columns: ["student_username"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["username"];
          },
        ];
      };
      profiles: {
        Row: {
          achievements: string[] | null;
          avatar_url: string | null;
          bio: string | null;
          full_name: string | null;
          id: string;
          phone: number | null;
          projects_count: number | null;
          roll_num: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
          year: number | null;
        };
        Insert: {
          achievements?: string[] | null;
          avatar_url?: string | null;
          bio?: string | null;
          full_name?: string | null;
          id: string;
          phone?: number | null;
          projects_count?: number | null;
          roll_num: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
          year?: number | null;
        };
        Update: {
          achievements?: string[] | null;
          avatar_url?: string | null;
          bio?: string | null;
          full_name?: string | null;
          id?: string;
          phone?: number | null;
          projects_count?: number | null;
          roll_num?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
          year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
