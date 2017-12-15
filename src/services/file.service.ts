import { Alumno } from "../pages/adminUsuarios/abms/abmAlumno/abmAlumno";
import * as XLSX from 'xlsx';

export class FileService {

    public static CsvToAlumnosList(fileContent: string): Alumno[] {
        return this.lineasToAlumnosList(fileContent.split("\n"));
    }

    public static ExelToAlumnosList(result: any): Alumno[] {
	    let workBook: XLSX.WorkBook = XLSX.read(result, {type: 'binary'});
        let sheet: XLSX.WorkSheet = workBook.Sheets[workBook.SheetNames[0]];
        let props: Array<string> = Object.keys(sheet);
        props.splice(0, 1);
        props.splice(props.length-1, 1);
        let colA = new Array<string>();
        let colB = new Array<string>();
        let colC = new Array<string>();
        props.forEach(p => {
            switch(p.charAt(0)) {
                case 'A':
                    colA.push((sheet[p])["w"]);
                    break;
                case 'B':
                    colB.push((sheet[p])["w"]);
                    break;
                case 'C':
                    colC.push((sheet[p])["w"]);
                    break;
            }
        });
        let lineas = new Array<string>();
        console.log(colA);
        console.log(colB);
        console.log(colC);
        for(let i = 0; i < colA.length; i++) {
            lineas.push(colA[i] + ";" + colB[i] + ";" + colC[i]);
        }
        console.log(lineas);
        return this.lineasToAlumnosList(lineas);
    }

    private static lineasToAlumnosList(lineas: Array<string>): Alumno[] {
        let alumnos = new Array<Alumno>();
        lineas.forEach(l => {
            let nombre: string;
            let apellido: string;
            let legajo: number;
            let turno: string;
            let elementos = l.split(";");
            legajo = parseInt(elementos[0]);
            if(elementos.length == 3){
                let nombres = elementos[1].split(",");
                if(nombres.length == 2) {
                    apellido = this.soloPrimeraEnMayuscula(nombres[0]);
                    nombre = nombres[1].replace(" ", "");
                    if(elementos[2].split(" ").length == 4){
                        let horaInicio = parseInt(elementos[2].split(" ")[2].split(":")[0]);
                        let horaFin = parseInt(elementos[2].split(" ")[3].split(":")[0]);
                        turno = (horaInicio >= 8 && horaFin <= 12) ? "Man" : "Noch";
                        let al = new Alumno(legajo, apellido, nombre, turno);
                        alumnos.push(al);    
                    }
                }
            }
        });
        return alumnos;
    }

    private static soloPrimeraEnMayuscula(apellidos: string): string {
        let ap: string = "";
        apellidos.split(" ").forEach(a => {
            a = a.toLocaleLowerCase();
            ap += a.charAt(0).toUpperCase() + a.slice(1) + " ";
        });
        return ap.substring(0, ap.length-1);
    }
   
}
