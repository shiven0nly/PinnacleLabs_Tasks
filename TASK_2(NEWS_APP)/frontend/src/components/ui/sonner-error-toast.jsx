import { toast } from 'sonner';
import { Button } from '~/components/ui/button';

const Example = () => (
  <Button onClick={() => toast.error('Something went wrong')} variant="outline">
    Show Error
  </Button>
);

export default Example;
