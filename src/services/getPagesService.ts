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

    public getAllPagesByUserType(usrType: string): Array<any>{
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
                this.listPage,
                this.inicioPage,
                this.tomarAsistenciaPage,
                this.encuestasPage,
                this.enviarAvisoPage,
                this.adminUsuariosPage,
                this.abmAlumnoPage,
                this.miPerfilPage,
                this.configuracionPage
            ];
        }
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

    public abmAlumnoPage = { 
        title: 'ABM Alumno', 
        component: AbmAlumnoPage,
        route: 'AbmAlumno',
        type: PageType.NotListable,
        icon: ""
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
}