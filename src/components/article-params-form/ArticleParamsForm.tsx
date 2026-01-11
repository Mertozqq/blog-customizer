import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group';
import { ArticleStateType, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	settings: ArticleStateType;
	submitButtonAction: (data: ArticleStateType) => void;
	resetButtonAction: () => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const {settings, submitButtonAction, resetButtonAction} = props;
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState(settings);

	useEffect(() => {
		setData(settings)
	}, [settings])
	const submitChanges = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitButtonAction(data);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => {
				setIsOpen(!isOpen)

			}} />
			<aside className={isOpen ? `${styles.container_open} ${styles.container}` : styles.container}>
				<form className={styles.form} onSubmit={submitChanges}>
					<Text as={'h2'} size={31} weight={800} uppercase>Задайте параметры</Text>

					<Select title='шрифт' selected={data.fontFamilyOption} options={fontFamilyOptions}
					onChange={(newFontFamily) =>{
						setData({
							...data,
							fontFamilyOption: newFontFamily
						})
					}}></Select>
					<RadioGroup title={'Размер'} options={fontSizeOptions} selected={data.fontSizeOption} name={'fontSize'}
					onChange={(newSize) =>{
						setData({
							...data,
							fontSizeOption: newSize
						})
					}}></RadioGroup>
					<Select title='цвет шрифта' selected={data.fontColor} options={fontColors}
					onChange={(newColor) =>{
						setData({
							...data,
							fontColor: newColor
						})
					}}></Select>
					<Separator/>
					<Select title='Цвет фона' selected={data.backgroundColor} options={backgroundColors}
					onChange={(newColor) =>{
						setData({
							...data,
							backgroundColor: newColor
						})
					}}></Select>
					<Select title='Ширина контента' selected={data.contentWidth} options={contentWidthArr}
					onChange={(newWidth) =>{
						setData({
							...data,
							contentWidth: newWidth
						})
					}}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={resetButtonAction} htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
