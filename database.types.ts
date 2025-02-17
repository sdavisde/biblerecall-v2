export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          id: number
          name: string
          testament: string
        }
        Insert: {
          id?: number
          name: string
          testament: string
        }
        Update: {
          id?: number
          name?: string
          testament?: string
        }
        Relationships: []
      }
      colors: {
        Row: {
          created_at: string
          hsl: string
          id: number
          name: string
          theme: Database["public"]["Enums"]["theme"]
        }
        Insert: {
          created_at?: string
          hsl: string
          id?: number
          name: string
          theme: Database["public"]["Enums"]["theme"]
        }
        Update: {
          created_at?: string
          hsl?: string
          id?: number
          name?: string
          theme?: Database["public"]["Enums"]["theme"]
        }
        Relationships: []
      }
      friends: {
        Row: {
          created_at: string | null
          friend_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          friend_id: string
          id?: never
          user_id: string
        }
        Update: {
          created_at?: string | null
          friend_id?: string
          id?: never
          user_id?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string
          font: Database["public"]["Enums"]["font"] | null
          id: string
          theme: Database["public"]["Enums"]["theme"] | null
          user_id: string | null
          vdd_enabled: boolean | null
          version: Database["public"]["Enums"]["bible_version"] | null
          visibility: Database["public"]["Enums"]["verse_visibility"] | null
          votd_enabled: boolean | null
        }
        Insert: {
          created_at?: string
          font?: Database["public"]["Enums"]["font"] | null
          id?: string
          theme?: Database["public"]["Enums"]["theme"] | null
          user_id?: string | null
          vdd_enabled?: boolean | null
          version?: Database["public"]["Enums"]["bible_version"] | null
          visibility?: Database["public"]["Enums"]["verse_visibility"] | null
          votd_enabled?: boolean | null
        }
        Update: {
          created_at?: string
          font?: Database["public"]["Enums"]["font"] | null
          id?: string
          theme?: Database["public"]["Enums"]["theme"] | null
          user_id?: string | null
          vdd_enabled?: boolean | null
          version?: Database["public"]["Enums"]["bible_version"] | null
          visibility?: Database["public"]["Enums"]["verse_visibility"] | null
          votd_enabled?: boolean | null
        }
        Relationships: []
      }
      user_meditations: {
        Row: {
          created_at: string
          id: number
          text: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          text?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          text?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      verses: {
        Row: {
          book_id: number
          chapter: number
          completions: number
          created_at: string
          end_verse: number | null
          favorite: boolean
          group_id: string | null
          id: string
          notes: string | null
          start_verse: number
          text: string
          user_id: string
          version: string
        }
        Insert: {
          book_id: number
          chapter: number
          completions?: number
          created_at?: string
          end_verse?: number | null
          favorite?: boolean
          group_id?: string | null
          id?: string
          notes?: string | null
          start_verse: number
          text: string
          user_id?: string
          version: string
        }
        Update: {
          book_id?: number
          chapter?: number
          completions?: number
          created_at?: string
          end_verse?: number | null
          favorite?: boolean
          group_id?: string | null
          id?: string
          notes?: string | null
          start_verse?: number
          text?: string
          user_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "verses_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verses_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bible_version:
        | "ESV"
        | "NIV"
        | "NLT"
        | "KJV"
        | "ASV"
        | "BBE"
        | "DARBY"
        | "WEB"
        | "YLT"
      font: "urbanist" | "openDyslexic"
      theme: "system" | "light" | "dark"
      verse_visibility: "full" | "partial" | "none"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
