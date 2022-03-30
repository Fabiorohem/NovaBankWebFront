import Modal from 'react-modal';
import { useClient } from '../../hooks/useClients';
import styles from './styles.module.scss';

interface ModalProps {
	isOpen: boolean;
	clientId: string;
	onRequestClose: () => void;
}

export function ClientModal({ isOpen, onRequestClose, clientId }: ModalProps) {
	const { deleteClient } = useClient();

	Modal.setAppElement('body');
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<h2 className={styles.title}>Tem certeza que deseja excluir esse cliente? </h2>
			<div className={styles.container}>
				<button
					type="button"
					className={styles.delete}
					onClick={() => {
						deleteClient(clientId);
						onRequestClose();
					}}
				>
					Excluir
				</button>
				<button type="button" className={styles.cancel} onClick={onRequestClose}>
					{' '}
					Cancelar
				</button>
			</div>
		</Modal>
	);
}
