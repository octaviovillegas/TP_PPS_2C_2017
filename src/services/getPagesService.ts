import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { AdminUsuariosPage } from '../pages/adminUsuarios/adminUsuarios';
import { AbmAlumnoPage } from '../pages/adminUsuarios/abms/abmalumno/abmalumno';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { EncuestasPage } from '../pages/encuestas/encuestas';
import { EnviarAvisoPage } from '../pages/enviarAviso/enviarAviso';
import { MiPerfilPage } from '../pages/miPerfil/miPerfil';
import { TomarAsistenciaPage } from '../pages/tomarAsistencia/tomarAsistencia';

export enum PageType {
    Listable,
    NotListable
}

export class GetPagesService{

    public static getAllPagesByUserType(usrType: string): Array<any>{
        if (usrType == "Alumno") {
            return [ 
                this.inicioPage, 
                this.listPage
            ];
        }

        if (usrType == "Profesor") {
            return [ 
                this.inicioPage, 
                this.listPage
            ];
        }

        if (usrType == "Administrativo") {
            return [ 
                this.inicioPage, 
                this.listPage
            ];
        }

        if (usrType == "Administrador") {
            return [
                this.inicioPage,
                this.listPage,
                this.adminUsuariosPage,
                this.abmAlumnoPage,
                this.configuracionPage,
                this.encuestasPage,
                this.enviarAvisoPage,
                this.miPerfilPage,
                this.tomarAsistenciaPage
            ];
        }
    }

    public static inicioPage = { 
        title: 'Inicio', 
        component: HomePage, 
        route: 'HomePage', 
        type: PageType.NotListable 
    };

    public static listPage = { 
        title: 'List', 
        component: ListPage, 
        route: 'ListPage', 
        type: PageType.NotListable 
    };

    public static adminUsuariosPage = { 
        title: 'Administrar Usuarios', 
        component: AdminUsuariosPage,
        route: 'AdminUsuariosPage',
        type: PageType.Listable
    };

    public static abmAlumnoPage = { 
        title: 'ABM Alumno', 
        component: AbmAlumnoPage,
        route: 'AbmAlumnoPage',
        type: PageType.NotListable
    };

    public static configuracionPage = { 
        title: 'Configuracion', 
        component: ConfiguracionPage,
        route: 'ConfiguracionPage',
        type: PageType.Listable
    };

    public static encuestasPage = { 
        title: 'Encuestas', 
        component: EncuestasPage,
        route: 'EncuestasPage',
        type: PageType.Listable
    };

    public static enviarAvisoPage = { 
        title: 'Enviar Aviso', 
        component: EnviarAvisoPage,
        route: 'EnviarAvisoPage',
        type: PageType.Listable
    };

    public static miPerfilPage = { 
        title: 'Mi Perfil', 
        component: MiPerfilPage,
        route: 'MiPerfilPage',
        type: PageType.Listable
    };

    public static tomarAsistenciaPage = { 
        title: 'Tomar Asistencia', 
        component: TomarAsistenciaPage,
        route: 'TomarAsistenciaPage',
        type: PageType.Listable
    };
}