import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

const mainState = {
  isModalVisible: false,
  modalTitle: null,
  modalContent: null,
};

export const modalReducer = (state = mainState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        isModalVisible: true,
        modalTitle: action.modalTitle,
        modalContent: action.modalContent,
      };
    }
    case CLOSE_MODAL: {
      return {
        isModalVisible: false,
        modalTitle: null,
        modalContent: null,
      };
    }

    default: {
      return state;
    }
  }
};