import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

interface ModalState {
  isModalVisible: boolean;
  modalTitle: string | null;
  modalContent: React.ReactNode | null;
}

interface OpenModalAction {
  type: typeof OPEN_MODAL;
  modalTitle: string;
  modalContent: React.ReactNode;
}

interface CloseModalAction {
  type: typeof CLOSE_MODAL;
}

type ModalAction = OpenModalAction | CloseModalAction;

const mainState: ModalState = {
  isModalVisible: false,
  modalTitle: null,
  modalContent: null,
};

export const modalReducer = (state = mainState, action: ModalAction): ModalState => {
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