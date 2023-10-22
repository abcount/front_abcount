export interface EmployeeDto {
    employeeId: number;
    name: string;
    email: string;
    urlProfilePicture: string | null;
}
export interface InvitedDto {
    invitationId: number;
    invited: string;
    invitedId: number;
    email: string;
    urlProfilePicture: string | null;
}

export interface EmployeeAndInvitationDto{
    employee: EmployeeDto[];
    invitation: InvitedDto[]
}