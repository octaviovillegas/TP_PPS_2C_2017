import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdminUsuariosPage } from '../pages/adminUsuarios/adminUsuarios';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { EncuestasPage } from '../pages/encuestas/encuestas';
import { EnviarAvisoPage } from '../pages/enviarAviso/enviarAviso';
import { MiPerfilPage } from '../pages/miPerfil/miPerfil';
import { TomarAsistenciaPage } from '../pages/tomarAsistencia/tomarAsistencia';
import { QrAlumnosPage } from '../pages/qr/qr-alumnos/qr-alumnos';
import { QrProfesoresPage } from '../pages/qr/qr-profesores/qr-profesores';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

export enum PageType {
    Listable,
    NotListable
}

export class PagesService {

    public getByUserType(userType: string): Array<any>{
        let lista = new Array<any>();
        lista.push(this.inicioPage);
        lista.push(this.listPage);

        if (userType == "alumno") {
            lista.push(this.QrAlumnosPage);
            lista.push(this.encuestasPage);
        }

        if (userType == "profesor") {
            lista.push(this.tomarAsistenciaPage);
            lista.push(this.encuestasPage);
            lista.push(this.enviarAvisoPage);
            lista.push(this.adminUsuariosPage);
            lista.push(this.QrProfesoresPage);
        }

        if (userType == "administrativo") {
        }

        if (userType == "administrador") {
            lista.push(this.tomarAsistenciaPage);
            lista.push(this.encuestasPage);
            lista.push(this.enviarAvisoPage);
            lista.push(this.adminUsuariosPage);
            lista.push(this.QrAlumnosPage);
            lista.push(this.QrProfesoresPage);            
        }

        lista.push(this.miPerfilPage);
        lista.push(this.configuracionPage);
        return lista;
    }

    public inicioPage = { 
        title: 'Inicio', 
        component: HomePage, 
        route: 'Home', 
        type: PageType.NotListable
    };

    public listPage = { 
        title: 'List', 
        component: ListPage, 
        route: 'List', 
        type: PageType.NotListable
    };

    public adminUsuariosPage = { 
        title: 'Administrar Usuarios', 
        component: AdminUsuariosPage,
        route: 'AdminUsuarios',
        type: PageType.Listable,
        icon: "md-people"
    };

    public configuracionPage = { 
        title: 'Configuracion', 
        component: ConfiguracionPage,
        route: 'Configuracion',
        type: PageType.Listable,
        icon: "md-settings"
    };

    public encuestasPage = { 
        title: 'Encuestas', 
        component: EncuestasPage,
        route: 'Encuestas',
        type: PageType.Listable,
        icon: "md-podium"
    };

    public enviarAvisoPage = { 
        title: 'Enviar Aviso', 
        component: EnviarAvisoPage,
        route: 'EnviarAviso',
        type: PageType.Listable,
        icon: "md-notifications"
    };

    public miPerfilPage = { 
        title: 'Mi Perfil', 
        component: MiPerfilPage,
        route: 'MiPerfil',
        type: PageType.Listable,
        icon: "md-person"
    };

    public tomarAsistenciaPage = { 
        title: 'Tomar Asistencia', 
        component: TomarAsistenciaPage,
        route: 'TomarAsistencia',
        type: PageType.Listable,
        icon: "md-hand"
    };

    public QrAlumnosPage = { 
        title: 'QR Alumno', 
        component: QrAlumnosPage,
        route: 'QrAlumnos',
        type: PageType.Listable,
        icon: "md-qr-scanner"
    };

    public QrProfesoresPage = { 
        title: 'QR Profesor', 
        component: QrProfesoresPage,
        route: 'QrProfesores',
        type: PageType.Listable,
        icon: "md-qr-scanner"
    };
}
