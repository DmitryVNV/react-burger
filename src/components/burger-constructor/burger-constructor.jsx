import React from 'react';
import styles from './burger-constructor.module.css';
import {DragIcon, CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {burgerPropTypes} from '../../utils/propTypes';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {  
    const bunProps = props.data.find(ingredient=>ingredient.id='60666c42cc7b410027a1a9b1');
    const ingredientsId = ['60666c42cc7b410027a1a9bc', '60666c42cc7b410027a1a9bb', '60666c42cc7b410027a1a9b8','60666c42cc7b410027a1a9b7', '60666c42cc7b410027a1a9bd'];
	
    return (
		<div className={`${styles.constructor}`}>
			<div className="mt-25 mb-4 ml-4 mr-4 pl-8">
				<ConstructorElement
					text={bunProps.name + ' (верх)'}
					price={bunProps.price}          
					thumbnail={bunProps.image}
					type="top"
					isLocked="true"
				/>
			</div>
			
			<div className={`${styles.scroll}`}>
			{props.data.map((ingredient, id)=>(
				ingredientsId.includes(ingredient._id) ?
				<div className={`${styles.ingredient} ml-4 mr-4 mb-4 `} key={id}>
					<DragIcon type="primary" />
					<i className='ml-2'/>
					<ConstructorElement
					  text={ingredient.name}
					  price={ingredient.price}          
					  thumbnail={ingredient.image}
					/>
				</div>
				:
				""
			  ))}
			</div>
			
			<div className="mt-4 ml-4 mr-4 pl-8">
				  <ConstructorElement
					text={bunProps.name + ' (низ)'}
					price={bunProps.price}          
					thumbnail={bunProps.image}
					type="bottom"
					isLocked="true"
				  />
			</div>
			
		<div className={`${styles.submit_block}`}>
		  <div className={`${styles.submit_button} pr-4`}>
			<div className="price">
				 <span className="text text_type_digits-medium mr-2">
					1423
				 </span>
				 <CurrencyIcon />
			</div>

			<Button htmlType="button" type="primary" size="large">
				Оформить заказ
			</Button>
		  </div>
		</div>
	</div>
    );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(burgerPropTypes.isRequired)
};