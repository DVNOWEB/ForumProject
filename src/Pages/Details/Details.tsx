import React, { useContext, useEffect, useState } from "react";
import ThreadDetailView from "../../components/ThreadDetailView";
import { useUserContext } from "../../Context/Context";

const Details = () => {
  const { loggedInUser, setLoggedInUser } = useUserContext();

  return (
    <div>
      {loggedInUser && <ThreadDetailView loggedInUser={loggedInUser} />}
    </div>
  );
};

export default Details;
