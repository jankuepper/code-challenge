import { useAuth } from "@/components/authProvider";
import { Button } from "@/components/ui/button";
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
import { useNavigate } from "react-router";

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
  const { authData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<Contract[] | []>([]);
  const [tableRows, setTableRows] = useState<any>([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<
    Contract | undefined
  >(undefined);

  const refresh = () => {
    setLoading(true);
    if (authData) {
      fetch(`http://localhost:3000/customers/${authData.user.id}/contracts`, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.success) {
            setContracts(data.result);
          }
        })
        .finally(() => setLoading(false));
    }
  };
  useEffect(() => refresh(), []);
  useEffect(() => populateTableRows(), [contracts]);
  useEffect(() => {
    if (!openUpdateDialog) {
      refresh();
    }
  }, [openUpdateDialog]);

  const populateTableRows = () => {
    const tableRowsTemp = [];
    for (let i = 0; i < contracts.length; i++) {
      tableRowsTemp.push(
        <TableRow key={contracts[i]?.id}>
          <TableCell
            className="font-medium"
            onClick={() => {
              setSelectedContract(contracts[i]);
              setOpenUpdateDialog(true);
            }}
          >
            {contracts[i]?.id}
          </TableCell>
          <TableCell
            onClick={() => {
              setSelectedContract(contracts[i]);
              setOpenUpdateDialog(true);
            }}
          >
            {contracts[i]?.name}
          </TableCell>
          <TableCell
            onClick={() => {
              setSelectedContract(contracts[i]);
              setOpenUpdateDialog(true);
            }}
          >
            {contracts[i]?.status}
          </TableCell>
          <TableCell
            onClick={() => {
              setSelectedContract(contracts[i]);
              setOpenUpdateDialog(true);
            }}
          >
            {contracts[i]?.user_id}
          </TableCell>
          <TableCell>
            <Button
              onClick={() =>
                navigate("/contract-audit", {
                  state: {
                    contractAuditId: contracts[i].id,
                  },
                })
              }
            >
              Latest
            </Button>
          </TableCell>
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
              <TableHead className="w-[100px]">Audit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{tableRows}</TableBody>
        </Table>
        <UpdateContractDialog
          open={openUpdateDialog}
          onOpenChange={setOpenUpdateDialog}
          contract={selectedContract!}
        />
      </div>
    </>
  );
}
