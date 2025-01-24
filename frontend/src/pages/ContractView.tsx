import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateContractDialog } from "@/components/updateContractDialog";
import { useEffect, useState } from "react";

type ContractStatus = "approved" | "open" | "closed";
export type Contract = {
  id: number;
  name: string;
  status: ContractStatus;
  user_id?: User["id"];
};
export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  type: "customer";
};

export function ContractView() {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<Contract[] | []>([]);
  const [tableRows, setTableRows] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<
    Contract | undefined
  >(undefined);

  const refresh = () => {
    // TODO: insert id of authenticated user once its done
    fetch(`http://localhost:3000/customers/${2}/contracts`)
      .then((result) => result.json())
      .then((data) => {
        if (data.success) {
          setContracts(data.result);
        }
        console.log(data);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => refresh(), []);
  useEffect(() => populateTableRows(), [contracts]);

  const populateTableRows = () => {
    const tableRowsTemp = [];
    for (let i = 0; i < contracts.length; i++) {
      tableRowsTemp.push(
        <TableRow
          onClick={() => {
            setSelectedContract(contracts[i]);
            setOpenDialog(true);
          }}
          key={contracts[i]?.id}
        >
          <TableCell className="font-medium">{contracts[i]?.id}</TableCell>
          <TableCell>{contracts[i]?.name}</TableCell>
          <TableCell>{contracts[i]?.status}</TableCell>
          <TableCell>{contracts[i]?.user_id}</TableCell>
        </TableRow>
      );
    }
    setTableRows(tableRowsTemp);
  };

  return (
    <>
      <div className="h-dvh" hidden={loading}>
        <Table>
          <TableCaption>A list of your contracts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>UserId</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableRows}</TableBody>
        </Table>
        <UpdateContractDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          contract={selectedContract!}
        />
      </div>
    </>
  );
}
