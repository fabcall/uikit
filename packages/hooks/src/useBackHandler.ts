import { type DependencyList, useEffect, useRef } from "react"
import { BackHandler } from "react-native"

export const useBackHandler = (handler: () => boolean, deps: DependencyList = []): void => {
  const backHandlerRef = useRef(handler);

  useEffect(() => {
    backHandlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () =>
      backHandlerRef.current()
    );
    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Deps are dynamic and depend on the handler
  }, deps);
};
