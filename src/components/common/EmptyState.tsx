type EmptyStateProps = {
  message: string;
};
function EmptyState({ message }: EmptyStateProps) {
  return <h2>{message}</h2>;
}

export default EmptyState;
