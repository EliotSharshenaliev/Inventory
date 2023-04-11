import * as XLSX from 'xlsx';
import * as FileSystem from "expo-file-system";
import * as Sharing from 'expo-sharing';
import { useService } from "../db/services/service";
import {useContext} from "react";
import {Context} from "../context/context";
import {LocationContext} from "../context/location_context";

type DataType = {
    [key: string]: any;
};

type BackgroundTaskType = {
    importExcel: (result: any) => Promise<DataType[]>;
    fn_export: () => Promise<void>;
};

export const useBackgroundTask = (): BackgroundTaskType => {
    const { get_export_datas, get_location_name_by_id } = useService();
    const {setTypeOfMessage, setOpenState, setMessage, SetTimeOut} = useContext(Context)

    const {setLoading} = useContext(Context)
    const {
        setModalVisible,
        selectedLocations
    } = useContext(LocationContext)

    const importExcel = async (result: any): Promise<DataType[]> => {
        try {
            const excelFilePath = result.uri
            const fileContents = await FileSystem.readAsStringAsync(excelFilePath, { encoding: FileSystem.EncodingType.Base64 });
            const workbook = XLSX.read(fileContents, { type: 'base64' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        } catch (error) {
            console.log('Error importing Excel file:', error);
            throw error;
        }
    };

    const fn_export = async (): Promise<void> => {
        setLoading(true);
        if(selectedLocations.length > 0) {
            try {
                // const workbook = XLSX.utils.book_new();

                let txt = ""

                for (let id of selectedLocations) {
                    const {title} = await get_location_name_by_id(id)
                    const data_json = await get_export_datas(id);
                    // const worksheet = XLSX.utils.json_to_sheet(data_json);

                    if(data_json.length > 0) {
                        // const table = data_json.reduce((acc, {code, article, scanned_at}) => {
                        //     const row = `\t${code}\t${article}\t${scanned_at}\t\n`;
                        //     return acc + row;
                        // }, `${title}\t\t\t\t\n`);
                        //
                        console.log(data_json)
                        data_json.map(({ code, article, scanned_at }) => txt += `${title} , ${code}, ${article}, ${scanned_at} \n`)
                    }
                    // const worksheet = XLSX.utils.aoa_to_sheet([
                    //     [`${title}\n\n`],
                    //     ['code', 'article', 'scanned_at'],
                    //     ...data_json.map(({ code, article, scanned_at }) => [code, article, scanned_at]),
                    // ]);
                    // XLSX.utils.book_append_sheet(workbook, worksheet, title);
                }
                if(txt.length != 0){
                    const fileUri = `${FileSystem.documentDirectory}/data.txt`;
                    // const buffer = XLSX.write(workbook, { type: 'base64' });
                    await FileSystem.writeAsStringAsync(fileUri, txt, {
                        encoding: FileSystem.EncodingType.UTF8,
                    });
                    setLoading(false);
                    await Sharing.shareAsync(fileUri);
                    setModalVisible(false)
                }else {
                    setModalVisible(false)
                    setTypeOfMessage("error")
                    SetTimeOut(2500)
                    setOpenState(true)
                    setMessage(`Данном локации не распознано не одного товара`)
                }
            } catch (error) {
                console.error(error);
            }
        }
    };


    return { importExcel, fn_export };
};
