import ProjectListView from 'routes/Project/subviews/ProjectList/components/ProjectListView';

import StandardListView from 'routes/Knowledge/subviews/StandardList/components/StandardListView';

import UserTreeView from 'routes/System/subviews/UserList/components/UserTreeView';
import OrganizationTreeView from 'routes/System/subviews/OrganizationTree/components/OrganizationTreeView';
import RoleListView from 'routes/System/subviews/RoleList/components/RoleListView';

import ItemContainer from 'common/basic/containers/ItemContainer';

//staff management
import InspectPeople from 'routes/PeopleManagement/PeopleManagementRecords/InspectPeople';
import PeopleManagementRecordsView from 'routes/PeopleManagement/PeopleManagementRecords/PeopleManagementRecordsView';
import Rcomponent from 'routes/PeopleManagement/components/Rcomponent';
import StaffTrainingListView from 'routes/Peoplemanagement/StaffTrainingListView';
import StaffQualificationView from 'routes/Peoplemanagement/StaffQualification/StaffQualificationView';
import TestView from 'routes/Peoplemanagement/Auth/StaffAuthorizationView';
//supervise
import SuperviseList from 'routes/Supervise/SuperviseList';
import SupervisePlans from 'routes/Supervise/SupervisePlans';
import SuperviseRecord from 'routes/Supervise/SuperviseRecord';

//PeriodCheck
import RecordComponent from "./IntermediateChecks/RecordComponent"
import PeriodCheckListView from './PeriodCheck/PeriodCheckListView';

//training
import TrainingApplication from 'routes/TrainingManagement/TrainingApplication';
import AnnualTrainingMain from 'routes/Annual/AnnualTrainingMain';
import TrainingRecordMain from 'routes/TrainingRecord/TrainingRecordMain';

//management review
import ManagementReviewList from 'routes/ManagementReview/ManagementReviewList';
import ManagementReviewDetail from 'routes/ManagementReview/ManagementReviewDetail';

const tabsmap = 
[
    {
        path: '/project_list',
        component: ItemContainer('project', ProjectListView)
    },
    {
        path: '/standard_list',
        component: ItemContainer('standard', StandardListView)
    },
    {
        path: '/user_list',
        component: UserTreeView
    },
    {
        path: '/organization_tree',
        component: OrganizationTreeView
    },
    {
        path: '/role_list',
        component: ItemContainer('role', RoleListView)
    },
    //peoplemanagement
    {
        path: '/PeopleManagementRecords',
        component: ItemContainer('StaffManagement',PeopleManagementRecordsView)
    },
    {
        path: '/StaffFile_fake',
        component: ItemContainer('StaffFile', InspectPeople)
    },
    {
        path: '/stafftraining_list',
        component: ItemContainer('StaffTraining',StaffTrainingListView)
    },
    {
        path: '/staff_auth_list',
        component: ItemContainer('Authorization',TestView),
    },
    {
        path: '/staff_quali_list',
        component: StaffQualificationView,
    },
    {
        path: '/resigner_list',
        component: ItemContainer('Resigner', Rcomponent)
    },
    //supervise
    {
        path: '/Supervise',
        component: ItemContainer('Supervise', SuperviseList)
    },
    {
        path: '/SupervisePlans_fake',
        component: ItemContainer('SupervisePlans', SupervisePlans)
    },
    {
        path: '/SuperviseRecord_fake',
        component: ItemContainer('SuperviseRecord', SuperviseRecord)
    },
    //peiriodcheck
    {
        path: '/record_list',
        component: ItemContainer('Record',RecordComponent)
    },
    {
        path: '/periodcheck_list',
        component: ItemContainer('PeriodCheck',PeriodCheckListView)
    },
    //training
    {
        path:'/application_list',
        component: ItemContainer('Application',TrainingApplication)
    },
    {
        path:'/annualPlan_list',
        component:ItemContainer('AnnualTrainingMain',AnnualTrainingMain)
    },
    {
        path:'/trainingRecord_list',
        component:ItemContainer('TrainingRecordMain',TrainingRecordMain)
    },
    //management review
    {
    	path:'/ManagementReview',
    	component:ItemContainer('ManagementReview', ManagementReviewList)
    },
    {
        path:'/ManagementReviewDetail_fake',
        component:ItemContainer('ManagementReviewDetail', ManagementReviewDetail)
    }
]

export default tabsmap