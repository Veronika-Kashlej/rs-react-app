import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import styles from './ErrorMessage.module.css';
import { useTranslations } from 'next-intl';

interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError;
}
export function ErrorMessage({ error }: ErrorMessageProps) {
  const errorT = useTranslations('ErrorMessage');
  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if ('status' in error) {
      return typeof error.data === 'string'
        ? error.data
        : 'Error occurred without a specific message';
    } else {
      return typeof error.message === 'string'
        ? error.message
        : 'Unknown error occurred';
    }
  };
  return (
    <div className={styles['error-message']}>
      <h2>{errorT('title')}</h2>
      <p>{getErrorMessage(error)}</p>
      <p>{errorT('advice')}</p>
    </div>
  );
}
