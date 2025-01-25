import { useAuth } from "@/components/authProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export function ContractAudit() {
  const { toast } = useToast();
  const { authData } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [contractAudit, setContractAudit] = useState<
    { name: string; old: any; new: any }[] | undefined
  >(undefined);
  const [rows, setRows] = useState<any>([]);
  const refresh = () => {
    if (!location.state.contractAuditId || !authData) return;
    fetch(
      `http://localhost:3000/contract_audits/${location.state.contractAuditId}/diff`,
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const { success, result, errors } = data;
        if (errors) {
          throw Error(errors);
        }
        if (!success && !result) {
          toast({
            title: "Empty!",
            description: `No audit entry exists for this contract ${location.state.contractAuditId}`,
          });
          return;
        }
        setContractAudit(result);
      })
      .catch((e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Something went wrong.",
        });
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => refresh(), []);
  useEffect(() => populateTable(), [contractAudit]);

  const populateTable = () => {
    if (!contractAudit) return;
    const tmpRows = contractAudit.map((audit) => (
      <TableRow key={audit.name}>
        <TableCell>{audit.name}</TableCell>
        <TableCell className="bg-red-200">{audit.old}</TableCell>
        <TableCell className="bg-green-200">{audit.new}</TableCell>
      </TableRow>
    ));

    setRows(tmpRows);
  };

  return (
    <>
      <div className="h-dvh" hidden={loading}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Old Value</TableHead>
              <TableHead>New Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    </>
  );
}
