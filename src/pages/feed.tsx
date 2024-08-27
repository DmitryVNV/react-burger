import React, { memo, useEffect } from "react";
import OrdersFeed from "../components/orders-feed/orders-feed";
import OrdersBoard from "../components/orders-board/orders-board";
import { useDispatch } from "../services/hooks";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from "../services/constants/ws-actions";

function Feed() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  return (
    <main>
      <div>
        <OrdersFeed />
        <OrdersBoard />
      </div>
    </main>
  );
}

export default memo(Feed);