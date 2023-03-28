import * as XLSX from 'xlsx';
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const useBackgroundTask = () => {
    const importExcel = async (result) => {
        try {
            const excelFilePath = result.uri.replace('file://', '');
            const fileContents = await FileSystem.readAsStringAsync(excelFilePath, { encoding: FileSystem.EncodingType.Base64 });
            const workbook = XLSX.read(fileContents, { type: 'base64' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            return XLSX.utils.sheet_to_json(worksheet, {header: 1});
        } catch (error) {
            console.log('Error importing Excel file:', error);
            throw error;
        }
    };

    const exportToExcel = async (data, setLoading) => {
        const fileName = new Date().getDate().toString()
        try {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            const wbout = XLSX.write(workbook, {
                type: 'base64',
                bookType: 'xlsx',
            });
            const uri = FileSystem.cacheDirectory + fileName + '.xlsx';
            await FileSystem.writeAsStringAsync(uri, wbout, {
                encoding: FileSystem.EncodingType.Base64,
            });


            // await Sharing.shareAsync(uri, {
            //     mimeType:
            //         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            //     dialogTitle: 'Share Excel file',
            //     UTI: 'com.microsoft.excel.xlsx',
            // });

            setTimeout(()=> {
                return true
            }, 2000)
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            throw error;
        }
    };

    return { importExcel, exportToExcel };
};
