import { modalReducer, mainState } from "./modal";
import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";
import { TModalActions } from "../actions/modal";

describe("modal reducer", () => {
  it("Return the initial state", () => {
    expect(modalReducer(undefined, {} as TModalActions)).toEqual(mainState);
  });

  it("Check if handle OPEN_MODAL", () => {
    const state = {
      ...mainState,
      modalTitle: "Заголовок",
      modalContent: null as any,
      isModalVisible: true,
    };
    expect(
      modalReducer(undefined, {
        type: OPEN_MODAL,
        modalTitle: "Заголовок",
        modalContent: null as any,
      })
    ).toEqual(state);
  });

  it("Check if handle CLOSE_MODAL", () => {
    const state = {
      ...mainState,
      isModalVisible: false,
    };
    expect(modalReducer(undefined, { type: CLOSE_MODAL })).toEqual(state);
  });
});