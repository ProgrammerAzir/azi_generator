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
      azi_menu: {
        Row: {
          created_at: string
          icon: string | null
          id: number
          is_permission: boolean
          is_router: boolean
          name: string
          parent_id: number | null
          perms_code: string | null
          sort: number
          url: string | null
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: number
          is_permission?: boolean
          is_router?: boolean
          name: string
          parent_id?: number | null
          perms_code?: string | null
          sort?: number
          url?: string | null
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: number
          is_permission?: boolean
          is_router?: boolean
          name?: string
          parent_id?: number | null
          perms_code?: string | null
          sort?: number
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_azi_menu_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "azi_menu"
            referencedColumns: ["id"]
          },
        ]
      }
      azi_permission: {
        Row: {
          code: string | null
          created_at: string
          id: number
          name: string | null
          table_name: string | null
          table_permission:
          | Database["public"]["Enums"]["permission_type"]
          | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: number
          name?: string | null
          table_name?: string | null
          table_permission?:
          | Database["public"]["Enums"]["permission_type"]
          | null
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: number
          name?: string | null
          table_name?: string | null
          table_permission?:
          | Database["public"]["Enums"]["permission_type"]
          | null
        }
        Relationships: []
      }
      azi_role: {
        Row: {
          create_by: string | null
          created_at: string
          description: string | null
          id: number
          role_code: string | null
          role_name: string | null
          update_at: string | null
          update_by: string | null
        }
        Insert: {
          create_by?: string | null
          created_at?: string
          description?: string | null
          id?: number
          role_code?: string | null
          role_name?: string | null
          update_at?: string | null
          update_by?: string | null
        }
        Update: {
          create_by?: string | null
          created_at?: string
          description?: string | null
          id?: number
          role_code?: string | null
          role_name?: string | null
          update_at?: string | null
          update_by?: string | null
        }
        Relationships: []
      }
      azi_role_data_menu: {
        Row: {
          created_at: string
          id: number
          menu_id: number | null
          role_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          menu_id?: number | null
          role_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          menu_id?: number | null
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_azi_role_data_menu_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "azi_menu"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_azi_role_data_menu_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "azi_role"
            referencedColumns: ["id"]
          },
        ]
      }
      azi_user_role: {
        Row: {
          created_at: string
          id: number
          role_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_azi_user_role_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "azi_role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_azi_user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      demo: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      ooo: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
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
      permission_type: "SELECT" | "INSERT" | "UPDATE" | "DELETE" | "ALL"
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

