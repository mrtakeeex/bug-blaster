export default function ticketReducer(state, action) {
  switch (action.type) {
    case "ADD_TICKET":
      return {
        // create new state
        ...state, // ALWAYS copying current state, states are immutable
        tickets: [...state.tickets, action.payload], // describe the change to the state, add the new ticket at the end (payload)
      };
    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket.id !== action.payload.id
        ),
      };
    case "UPDATE_TICKET":
      return {
        ...state,
        // scan the current state and update the ticket with the same id as the one in the payload
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };
    default:
      return state;
  }
}
