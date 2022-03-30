import { Fragment, useState } from 'react';
import styles from './styles.module.scss';

interface AddressProps {
	street?: string;
	number?: string;
	complement?: string;
	district?: string;
	city?: string;
	state?: string;
	country?: string;
	changes?: {
		streetChange: string;
		complementChange: string;
	};
}

export default function Address({ street, number, complement, district, city, state, country }: AddressProps) {
	return (
		<Fragment>
			<div className={styles.formgroup}>
				<label>Rua</label>
				<input
					className={styles.inputControl}
					style={{ marginLeft: '16px', flex: 4 }}
					type="text"
					defaultValue={street}
				/>

				<label>Nº</label>
				<input className={styles.inputControl} style={{ flex: 1 }} type="text" defaultValue={number} />

				<label>Complemento</label>
				<input className={styles.inputControl} style={{ flex: 4 }} type="text" defaultValue={complement} />
			</div>

			<div className={styles.formgroup}>
				<label>Bairro</label>
				<input className={styles.inputControl} type="text" defaultValue={district} />

				<label>Cod.Cidade</label>
				<input className={styles.inputControl} type="text" defaultValue={city} />

				<label>Estado</label>
				<input className={styles.inputControl} type="text" defaultValue={state} />

				<label>País</label>
				<input className={styles.inputControl} type="text" defaultValue={country} />
			</div>
		</Fragment>
	);
}
