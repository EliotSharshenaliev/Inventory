import * as SQLite from "expo-sqlite";
import {dbName} from "../init";
import {useEffect, useState} from "react";




export const useService  = () => {
    const db = SQLite.openDatabase(dbName);

    useEffect(()=> {
        db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Locations (id INTEGER PRIMARY KEY AUTOINCREMENT ,title STRING);");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY AUTOINCREMENT ,code INTEGER, article STRING);");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Compared_items (id INTEGER PRIMARY KEY AUTOINCREMENT,code INTEGER,article STRING, scanned_at DATETIME, locationId INTEGER);",
                [],
                (_, resultSet) => {},
                (transaction, error) => {}
                )
        });
    }, [])

    const create_location  = (obj) => {
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO Locations (title) VALUES (?);', [obj.input],
                    (_, resultSet) => resolve("Created")
                )
            });
        })
    }

    const get_list_of_locations  = () => {
        return new Promise((resolve, reject)=> {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM Locations ORDER BY id DESC',
                    [],
                    (_, { rows: { _array } }) => {
                        resolve(_array)
                    }
                );
            });
        })
    }

    const delete_location = (id) =>{
        return new Promise((resolve, reject) => {
            db.transaction(
                (tx) => tx.executeSql('DELETE FROM Compared_items WHERE locationId = ?', [id],
                    (_, resultSet) =>  {}
                ),
                (error) => {},
            )
            db.transaction(
                (tx) => tx.executeSql('DELETE FROM Locations WHERE id = ?', [id],
                    (_, resultSet) =>  resolve("Result", resultSet)
                ),
                (error) => reject("Error", error),
            )
        })
    }

    const getItems = () => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT COUNT(*) AS count FROM Items',
                    [],
                    (_, { rows }) => {
                        resolve(rows._array[0].count);
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            });
        });
    };

    const getLenghtOfCompared_with_location = (id) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT COUNT(*) AS count FROM Compared_items WHERE locationId = ?',
                    [id],
                    (_, { rows }) => {
                        resolve(rows._array[0].count);
                    },
                    (tx, error) => {
                        reject(error);
                    }
                );
            });
        });
    };



    const update_location = (new_obj, id) => {
        db.transaction(tx => {
            tx.executeSql('UPDATE Locations SET title=? WHERE id=?', [new_obj.input, id],
                (_, resultSet) => {}
            )
        });
    }

    const get_location_name_by_id = id => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('SELECT title FROM Locations where id = ?', [id],
                    (_, {rows}) => resolve(rows._array[0]),
                    (transaction, error) => reject(error)
                )
            });
        })
    }
    const insert_items_base_codes = async (rows) => {
        return new Promise((resolve, reject) => {
            db.transaction(
            tx => {
                tx.executeSql("DROP TABLE IF EXISTS Items;");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY AUTOINCREMENT ,code INTEGER, article STRING);");
                rows.forEach(row => {
                        tx.executeSql('INSERT INTO Items (code, article) VALUES (?, ?);', [row[0], row[1]],
                            (_, resultSet) => {
                                resolve({"uploaded": "success"})
                            },
                            (_, error) => reject(error)
                        )
                    })
                },
                (error) => reject(error),
                () => resolve() );
        });
    };

    const insert_items_compared_base = ({code, article, locationId}) => {
        return new Promise((resolve, reject)=> {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO Compared_items (code, article, scanned_at, locationId) VALUES (?, ?, datetime(\'now\'), ?);', [code, article, locationId],
                    (_, resultSet) => resolve(resultSet),
                    (transaction, error) => reject(error)
                )
            });
        })
    }
    const get_confirmed_list = (id_location, setData) => {

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT id ,code, article, strftime(\'%H:%M:%S\', scanned_at) AS scanned_at FROM  Compared_items WHERE locationId=?',
                [id_location],
                (_, { rows: { _array } }) => {
                    setData(_array)
                    },
                (transaction, error) => {
                    console.log(error)
                }
            );
        });
    }

    const delete_item_from_confirmed_place = (id) => {
        db.transaction(
            (tx) => tx.executeSql('DELETE FROM Compared_items WHERE id = ?', [id]),
            (error) => console.log(error),
        )
    }

    const get_export_datas = id => {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'SELECT code, article, scanned_at FROM Compared_items Where locationId = ?',
                        [id],
                        (_, { rows: { _array } }) => resolve(_array),
                        (_, error) => resolve(error)
                    )
                },
                error => reject(error)
            )
        })
    }

    const compare_base_with_scanned = (scanned_barcode) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                (tx) => tx.executeSql("SELECT code, article FROM Items Where code = ?", [scanned_barcode],
                     (_, { rows: { _array } }) => {
                         resolve(_array)
                    }
                ),
                (error) => reject(error)
            )
        })
    }

    return {
        get_location_name_by_id,
        insert_items_base_codes,
        insert_items_compared_base,
        get_confirmed_list,
        delete_item_from_confirmed_place,
        get_export_datas,
        compare_base_with_scanned,
        create_location,
        get_list_of_locations,
        delete_location,
        update_location,
        getItems,
        getLenghtOfCompared_with_location
    }
}



