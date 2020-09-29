export default interface Task {
    idTask?: number;
    idAnagrafica: number,
    startDate: string,
    endDate: string,
    reminderDate: string,
    subject: string,
    priority: 0,
    idTaskType: number,
    taskColor: string,
    idTaskStatus: number,
    note: string,
    idTaskGest: 0,
    idTaskFrom: 0
}
