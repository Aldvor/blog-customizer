import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import { useState, useCallback, FormEvent, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState({
		fontFamily: articleState.fontFamilyOption,
		fontColors: articleState.fontColor,
		backgroundColors: articleState.backgroundColor,
		contentWidthArr: articleState.contentWidth,
		fontSizeOptions: articleState.fontSizeOption,
	});

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleArrowButtonClick = useCallback(() => {
		setIsSidebarOpen(!isSidebarOpen);
	}, [isSidebarOpen]);

	const handleClose = () => {
		setIsSidebarOpen(false);
	};

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onClose: handleClose,
		onChange: setIsSidebarOpen,
	});

	const formResetHandler = () => {
		setFormState((articleState) => ({
			...articleState,
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		}));

		setArticleState(defaultArticleState);
	};

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		setArticleState({
			...articleState,
			fontFamilyOption: formState.fontFamily,
			fontColor: formState.fontColors,
			backgroundColor: formState.backgroundColors,
			contentWidth: formState.contentWidthArr,
			fontSizeOption: formState.fontSizeOptions,
		});

		setIsSidebarOpen(!isSidebarOpen);
		console.log(articleState);
	};

	return (
		<>
			<ArrowButton
				onClick={handleArrowButtonClick}
				isMenuOpen={isSidebarOpen}
			/>
			<aside
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							setFormState((articleState) => ({
								...articleState,
								fontFamily: selectedOption,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOptions}
						name={'Размер шрифта'}
						onChange={(selectedOption) =>
							setFormState((articleState) => ({
								...articleState,
								fontSizeOptions: selectedOption,
							}))
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColors}
						options={fontColors}
						onChange={(selectedOption) =>
							setFormState((articleState) => ({
								...articleState,
								fontColors: selectedOption,
							}))
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColors}
						options={backgroundColors}
						onChange={(selectedOption) =>
							setFormState((articleState) => ({
								...articleState,
								backgroundColors: selectedOption,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidthArr}
						options={contentWidthArr}
						onChange={(selectedOption) =>
							setFormState((articleState) => ({
								...articleState,
								contentWidthArr: selectedOption,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
