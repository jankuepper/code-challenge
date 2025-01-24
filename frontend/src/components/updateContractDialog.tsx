import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UpdateContractForm } from "@/components/changeContractForm";
import { Contract } from "@/pages/ContractView";

export function UpdateContractDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: Contract;
}) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit contract</DialogTitle>
          <DialogDescription>
            Make changes to your contract here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <UpdateContractForm
          contract={props.contract}
          onOpenChange={props.onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}
