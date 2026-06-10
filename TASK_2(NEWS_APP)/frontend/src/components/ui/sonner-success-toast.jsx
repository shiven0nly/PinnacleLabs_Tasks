import { toast } from 'sonner';
import { Button } from '~/components/ui/button';

const Example = () => (
  <Button
    onClick={() => toast.success('Your changes have been saved')}
    variant="outline"
  >
    Show Success
  </Button>
);

export default Example;
