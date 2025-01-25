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
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [contractAudit, setContractAudit] = useState(undefined);
  const [rows, setRows] = useState<any>([]);
  const refresh = () => {
    if (!location.state.contractAuditId) return;
    fetch(
      `http://localhost:3000/contract_audits/${location.state.contractAuditId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw Error(data.error);
        }
        setContractAudit(data.result);
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
