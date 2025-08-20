import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import { useGetEvent } from "../hooks/useGetEvent";
import EventDetail from "../components/EventDetail";

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { event, isLoading: isEventLoading } = useGetEvent(id);

  if (isEventLoading) return <Spinner />;

  if (!event) {
    navigate("/");
    return;
  }

  return <EventDetail {...event} />;
}
