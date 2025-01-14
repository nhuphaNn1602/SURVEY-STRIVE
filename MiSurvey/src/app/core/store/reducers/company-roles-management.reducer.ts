import { createReducer, on } from '@ngrx/store';
import { CompanyRole } from '../../models';
import { companyRoleManagementActions } from '../actions';
import { CompanyRolesManagementState } from '../states';

export const initialCompanyRoleState: CompanyRolesManagementState = {
  companyRoles: [],
  selectedCompanyRole: null,
  loading: false,
  error: null,
};

export const companyRolesManagementReducer = createReducer(
  initialCompanyRoleState,
  on(companyRoleManagementActions.createCompanyRoleRequest, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(companyRoleManagementActions.createCompanyRoleSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(
    companyRoleManagementActions.createCompanyRoleFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })
  ),

  on(companyRoleManagementActions.loadCompanyRolesRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    companyRoleManagementActions.loadCompanyRolesSuccess,
    (state, { roles }) => ({
      ...state,
      companyRoles: roles,
      loading: false,
    })
  ),
  on(
    companyRoleManagementActions.loadCompanyRolesFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })
  ),
  on(companyRoleManagementActions.updateCompanyRoleSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(
    companyRoleManagementActions.updateCompanyRoleFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })
  ),
  on(companyRoleManagementActions.deleteCompanyRoleSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(
    companyRoleManagementActions.deleteCompanyRoleFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })
  )
);
