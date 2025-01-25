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
  const [contractAudit, setContractAudit] = useState(undefined);
  const [rows, setRows] = useState<any>([]);
  const refresh = () => {
    if (!location.state.contractAuditId || !authData) return;
    fetch(
      `http://localhost:3000/contract_audits/${location.state.contractAuditId}`,
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
    try {
      if (!contractAudit) return;
      const newValues = Object.keys(contractAudit)
        .filter((key) => key.includes("new_"))
        .sort();
      const oldValues = Object.keys(contractAudit)
        .filter((key) => key.includes("old_"))
        .sort();
      if (newValues.length !== oldValues.length)
        throw Error("Something went wrong");
      const tmpRows = [];
      for (let i = 0; i < newValues.length; i++) {
        if (contractAudit[newValues[i]] === contractAudit[oldValues[i]])
          continue;
        tmpRows.push(
          <TableRow key={i}>
            <TableCell>{newValues[i].replace("new_", "")}</TableCell>
            <TableCell className="bg-red-200">
              {contractAudit[oldValues[i]]}
            </TableCell>
            <TableCell className="bg-green-200">
              {contractAudit[newValues[i]]}
            </TableCell>
          </TableRow>
        );
        setRows(tmpRows);
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong.",
      });
    }
  };

  return (
    <>
      <div className="h-dvh" hidden={loading}>
        <Table>
          {/* <TableCaption>A list of your contracts.</TableCaption> */}
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
