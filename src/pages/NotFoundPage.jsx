import Button from '../components/ui/Button.jsx';
import StateMessage from '../components/ui/StateMessage.jsx';

export default function NotFoundPage() {
  return (
    <StateMessage tone="info" icon="searchX" title="That page doesn’t exist" actions={<Button to="/" icon="home">Go home</Button>}>
      The link may be old or mistyped.
    </StateMessage>
  );
}
