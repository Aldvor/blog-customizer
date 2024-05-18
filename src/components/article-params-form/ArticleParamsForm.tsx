import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import { useState, FormEvent, useRef } from 'react';

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
	OptionType,
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
		fontFamilyOption: articleState.fontFamilyOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
		fontSizeOption: articleState.fontSizeOption,
	});

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleArrowButtonClick = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

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
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		}));

		setArticleState(defaultArticleState);
	};

	const handleFormChange = (key: string, value: OptionType) => {
		setFormState((prevFormState) => ({
			...prevFormState,
			[key]: value,
		}));
	};

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		setArticleState({
			...articleState,
			fontFamilyOption: formState.fontFamilyOption,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
			fontSizeOption: formState.fontSizeOption,
		});

		setIsSidebarOpen(!isSidebarOpen);
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
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							handleFormChange('fontFamilyOption', selectedOption)
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						name={'Размер шрифта'}
						onChange={(selectedOption) =>
							handleFormChange('fontSizeOption', selectedOption)
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selectedOption) =>
							handleFormChange('fontColor', selectedOption)
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selectedOption) =>
							handleFormChange('backgroundColor', selectedOption)
						}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selectedOption) =>
							handleFormChange('contentWidth', selectedOption)
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
