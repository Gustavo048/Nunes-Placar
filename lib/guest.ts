export function getGuestId() {

  if (typeof window === "undefined") {
    return null;
  }

  let guestId =
    localStorage.getItem("guest-id");

  /* CRIA ID */

  if (!guestId) {

    guestId =
      crypto.randomUUID();

    localStorage.setItem(
      "guest-id",
      guestId
    );
  }

  return guestId;
}

