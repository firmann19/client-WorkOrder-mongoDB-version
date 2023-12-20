import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import moment from "moment";

function TbodyWithAction({
  data,
  display,
  editUrl,
  deleteAction,
  actionNotDisplay,
  customAction,
  confirmationUrl,
  Detail,
  status,
}) {
  const navigate = useNavigate();
  return (
    <tbody>
      {status === "process" ? (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            <div className="flex items-center justify-center">
              <Spinner animation="border" variant="primary" />
            </div>
          </td>
        </tr>
      ) : data.length ? (
        data.map((data, index) => {
          const isConfirmationDisabled =
            data.StatusPengerjaan === "Pending" ||
            data.StatusPengerjaan === "Close";
          const isDetailDisabled =
            data.Tindakan === undefined && data.GantiSparepart === undefined;

          return (
            <tr key={index}>
              {Object.keys(data).map(
                (key) =>
                  display.indexOf(key) > -1 && (
                    <td key={key}>
                      {key === "Date_RequestWO" || key === "Date_CompletionWO"
                        ? moment(data[key]).format("DD-MM-YYYY, h:mm:ss a")
                        : data[key]}
                    </td>
                  )
              )}
              {!actionNotDisplay && (
                <td>
                  {customAction && customAction(data._id, data.StatusPengerjaan, data.StatusWO)}
                  {editUrl && (
                    <Button
                      variant="success"
                      size={"sm"}
                      action={() => navigate(`${editUrl}/${data._id}`)}
                    >
                      Edit
                    </Button>
                  )}
                  {confirmationUrl && (
                    <Button
                      variant="secondary"
                      size={"sm"}
                      action={() => navigate(`${confirmationUrl}/${data._id}`)}
                      disabled={isConfirmationDisabled}
                    >
                      Confirmation
                    </Button>
                  )}
                  {Detail && (
                    <Button
                      variant="warning"
                      size={"sm"}
                      className={"ms-2"}
                      action={() => navigate(`${Detail}/${data._id}`)}
                      disabled={isDetailDisabled}
                    >
                      Detail
                    </Button>
                  )}
                  {deleteAction && (
                    <Button
                      className={"mx-2"}
                      variant="danger"
                      size={"sm"}
                      action={() => deleteAction(data._id)}
                    >
                      Hapus
                    </Button>
                  )}
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: "center" }}>
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TbodyWithAction;
