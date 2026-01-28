import { useEffect } from "react";
import { supabase } from "@/supabaseClient";

type RealtimeEvent = "INSERT" | "UPDATE" | "DELETE";

type UseSupabaseRealtimeProps = {
  table: string;
  schema?: string;
  events?: RealtimeEvent[] | "*";
  onChange: () => void;
};

export function useSupabaseRealtime({
  table,
  schema = "public",
  events = "*",
  onChange,
}: UseSupabaseRealtimeProps) {
  useEffect(() => {
    const channel = supabase.channel(`${schema}-${table}-realtime`);

    if (events === "*") {
      channel.on(
        "postgres_changes" as any,
        { event: "*", schema, table },
        onChange
      );
    } else {
      events.forEach((event) => {
        channel.on(
          "postgres_changes" as any,
          { event, schema, table },
          onChange
        );
      });
    }

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, schema, JSON.stringify(events), onChange]);
}
